import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SituacionLaboral } from "@shared/types";
import { patchSituacionLaboral } from "@shared/services/client.service";

interface UpdateSituacionLaboralParams {
  id_cliente: string;
  payload: SituacionLaboral;
}

export function useUpdateSituacionLaboral() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id_cliente, payload }: UpdateSituacionLaboralParams) =>
      patchSituacionLaboral(id_cliente, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientData"] });
    },
    onError: (error) => {
      console.error(
        "Error en la mutación de actualización de situación laboral:",
        error
      );
    },
  });

  return {
    updateSituacionLaboral: mutation.mutateAsync,
    updateSituacionLaboralSync: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}
