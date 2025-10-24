import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DatosPP } from "@shared/types";
import { patchDatosPersonales } from "@shared/services/client.service";

interface UpdateDatosPersonalesParams {
  id_cliente: string;
  payload: DatosPP;
}

export function useUpdateDatosPersonales() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id_cliente, payload }: UpdateDatosPersonalesParams) =>
      patchDatosPersonales(id_cliente, payload),
    onSuccess: () => {
      // Invalida la query de clientData para que se vuelva a cargar
      queryClient.invalidateQueries({ queryKey: ["clientData"] });
    },
    onError: (error) => {
      console.error(
        "Error en la mutación de actualización de datos personales:",
        error
      );
    },
  });

  return {
    updateDatosPersonales: mutation.mutateAsync,
    updateDatosPersonalesSync: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}
