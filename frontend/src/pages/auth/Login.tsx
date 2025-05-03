import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import * as yup from "yup";
import { useUserStore } from "../../stores/userStore";

const schema = yup.object({
  username: yup.string().required("Une valeur est attendu"),
  password: yup.string().required("Une valeur est attendu"),
});

type Inputs = yup.InferType<typeof schema>;

const defaultValue: Partial<Inputs> = {
  username: "",
  password: "",
};

export interface UserData {
  id: string;
  username: string;
  email: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  token: string;
}

export default function Login() {
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema), defaultValues: defaultValue });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur serveur");
      }

      const user: UserData = await response.json();

      localStorage.setItem("token", user.token);

      login(user);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=''>
      <form className='fieldset' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='fieldset-legend'>Connexion</h2>

        <label htmlFor='username' className='label'>
          Username
        </label>
        <input
          type='text'
          className='input'
          placeholder='username'
          id='username'
          {...register("username")}
        />
        {errors.username && (
          <p className='text-red-500 italic font-bold'>{errors.username.message}</p>
        )}

        <label className='label' htmlFor='password'>
          Mot de passe
        </label>
        <input
          type='password'
          className='input'
          placeholder='Password'
          id='password'
          {...register("password")}
        />
        {errors.password && (
          <p className='text-red-500 italic font-bold'>{errors.password.message}</p>
        )}

        <Link to={"/register"}>Pas de compte</Link>

        <div className='flex '>
          <Link to={"/"} className='btn btn-neutral mt-4'>
            Retour
          </Link>
          <button className='btn btn-primary mt-4'>Login</button>
        </div>
      </form>
    </div>
  );
}
