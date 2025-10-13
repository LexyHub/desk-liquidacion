import { LexyMobile } from "@assets";
import type { Credentials } from "@types";
import { CircleX, Eye, EyeClosed } from "lucide-react";
import { useMemo, useState } from "react";
import { useAuth } from "@context/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Login() {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);
  const redirectIdDefensoria = params.get("redirect") || undefined;
  const unauthenticated = params.get("unauthenticated") === "true";
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });
  const [seePwd, setSeePwd] = useState<boolean>(false);
  const initialError = useMemo(() => {
    if (!redirectIdDefensoria)
      return "No puedes ingresar a esta plataforma sin una ID de Defensoría. Revisa la URL e inténtalo de nuevo.";
    if (unauthenticated)
      return "Tú sesión ha expirado o no has iniciado sesión. Por favor, ingresa nuevamente.";
    return null;
  }, [redirectIdDefensoria, unauthenticated]);
  const [error, setError] = useState<string | null>(initialError);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);
    const success = await logIn(credentials);
    if (!success) {
      setError("Credenciales incorrectas o error de conexión");
    } else {
      navigate(`/datos-personales/${redirectIdDefensoria}`);
    }
    setLoading(false);
  };

  const handleInputChange = (field: "username" | "password", value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  return (
    <main className='flex flex-col items-center justify-center w-dvw h-dvh bg-login bg-origin-content bg-center bg-no-repeat bg-cover font-archivo'>
      <img
        src={LexyMobile}
        alt='Lexy Mobile'
        className='w-28 md:w-44 md:absolute sm:top-24 md:top-44 xl:top-16 xl:left-32'
      />
      <section className='flex flex-col items-center gap-y-9 w-full max-w-xs md:max-w-lg xl:max-w-xl h-fit bg-lexy-bg-card text-lexy-text-primary px-4 py-6 md:p-9 rounded-[8px] md:rounded-[16px] shadow-lexy-table'>
        <div className='hidden md:grid grid-cols-[1fr_auto] w-full'>
          <div className='flex items-center gap-x-1.5 text-xl h-fit'>
            <h2>Bienvenido a</h2>
            <h2 className='text-lexy-brand-primary font-semibold'>LEXY</h2>
          </div>
        </div>
        <div className='md:hidden flex items-center gap-x-1.5 text-xl'>
          <h2>Bienvenido a</h2>
          <h2 className='text-lexy-brand-primary font-semibold'>LEXY</h2>
        </div>

        <form onSubmit={handleSubmit} className='w-full flex flex-col'>
          <h3 className='font-medium mb-6 md:text-3xl'>Iniciar sesión</h3>
          <section className='flex flex-col space-y-2 mb-6'>
            <div className='flex flex-col space-y-2 mb-4'>
              <label htmlFor='email'>Correo electrónico</label>
              <input
                id='email'
                type='text'
                placeholder='ejemplo@email.com'
                value={credentials.username}
                disabled={loading || redirectIdDefensoria === undefined}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className='outline outline-lexy-input-border focus:outline-lexy-brand-primary disabled:bg-neutral-200 disabled:cursor-not-allowed transition-all rounded-xs px-2.5 py-2'
              />
            </div>
            <div className='flex flex-col space-y-2'>
              <label htmlFor='password'>Contraseña</label>
              <div
                className={cn(
                  "grid grid-cols-[1fr_auto] items-center justify-between border border-lexy-input-border focus-within:border-lexy-brand-primary disabled:cursor-not-allowed transition-all rounded-xs px-2.5 py-2",
                  {
                    "bg-neutral-200":
                      loading || redirectIdDefensoria === undefined,
                  }
                )}>
                <input
                  id='password'
                  type={seePwd ? "text" : "password"}
                  placeholder='Ingresa tu contraseña'
                  value={credentials.password}
                  disabled={loading || redirectIdDefensoria === undefined}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className='outline-none bg-transparent'
                />
                <button
                  type='button'
                  title='Mostrar u ocultar contraseña'
                  disabled={loading || redirectIdDefensoria === undefined}
                  className='cursor-pointer disabled:cursor-not-allowed disabled:text-lexy-text-placeholder'
                  onClick={() => setSeePwd(!seePwd)}>
                  {seePwd ? <EyeClosed /> : <Eye />}
                </button>
              </div>
            </div>
          </section>
          {error && (
            <div className='mb-6 grid grid-cols-[auto_1fr] items-center gap-x-2 text-red-500 leading-5 text-lexy-state-danger animate-fade'>
              <CircleX className='size-5' />
              <span>{error}</span>
            </div>
          )}
          <button
            disabled={
              error !== null || loading || redirectIdDefensoria === undefined
            }
            type='submit'
            className='w-full bg-lexy-brand-primary px-4 py-2 text-white rounded-[4px] shadow-lexy-button font-medium cursor-pointer not-disabled:hover:opacity-75 transition-all disabled:opacity-50 disabled:cursor-not-allowed'>
            {loading ? "Iniciando sesión..." : "Ingresar"}
          </button>
        </form>
      </section>
    </main>
  );
}
