import type { ReactNode, ComponentType } from "react";

export function useProviderComposition(
  providers: ComponentType<{ children: ReactNode }>[],
  children: ReactNode
) {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    <>{children}</>
  );
}
