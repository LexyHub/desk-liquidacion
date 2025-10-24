import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useHeaderUI } from "@features/header";
import { useClientStore } from "@shared/stores/useClientStore";
import {
  getMessages,
  createMessage,
  deleteMessage,
  modifyMessage,
} from "../services/messages.service";
import type {
  Message,
  MessageInput,
  MessagesContextValue,
  UpdateMessageInput,
} from "../types/messages";

export function useMessages(): MessagesContextValue {
  const clientData = useClientStore((state) => state.clientData);
  const { rawPath } = useHeaderUI();
  const queryClient = useQueryClient();
  const cliente = clientData?.datos.id_cliente;

  const {
    data: allMessages = [],
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["messages", cliente],
    queryFn: ({ signal }) => getMessages(cliente!, signal),
    enabled: !!cliente,
    staleTime: 1000 * 60, // 1 minuto
    retry: (failureCount, error) => {
      if (error instanceof Error && error.name === "AbortError") return false;
      return failureCount < 2;
    },
  });

  const messages = useMemo(
    () => allMessages.filter((m) => m.modulo === rawPath),
    [allMessages, rawPath]
  );

  const createMutation = useMutation({
    mutationFn: (input: MessageInput) => {
      if (!cliente) throw new Error("Cliente no disponible");
      const payload: Message = {
        ...input,
        id_cliente: cliente,
        modulo: rawPath,
        entidad: input.entidad ?? "desk-liquidacion",
        creado_por: sessionStorage.getItem("email") || "desconocido",
      };
      return createMessage(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", cliente] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) => {
      if (!cliente) throw new Error("Cliente no disponible");
      return deleteMessage(cliente, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", cliente] });
    },
  });

  const modifyMutation = useMutation({
    mutationFn: ({ id, patch }: { id: number; patch: UpdateMessageInput }) => {
      if (!cliente) throw new Error("Cliente no disponible");
      return modifyMessage(cliente, id, patch);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", cliente] });
    },
  });

  return {
    messages,
    loading: isLoading,
    error: queryError?.message ?? null,
    refetch: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", cliente] });
    },
    create: async (input: MessageInput) => {
      await createMutation.mutateAsync(input);
    },
    remove: async (id: number) => {
      await removeMutation.mutateAsync(id);
    },
    modify: async (id: number, patch: UpdateMessageInput) => {
      await modifyMutation.mutateAsync({ id, patch });
    },
  };
}
