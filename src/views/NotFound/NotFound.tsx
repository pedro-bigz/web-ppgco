import { useNavigate } from "react-router-dom";
import { handleClick } from "utils";

interface NotFoundPageProps {
  link?: string;
}

export function NotFoundPage({ link }: NotFoundPageProps) {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <span className="font-mono text-8xl">404</span>
        <span className="font-mono text-2xl">Página não encontrada</span>
        <span>
          <a
            href="javascript:void(0)"
            className="font-mono text-xl no-underline hover:underline text-slate-400 hover:text-lime-600"
            onClick={handleClick(navigate, link || "/")}
          >
            Voltar para o início
          </a>
        </span>
      </div>
    </div>
  );
}
