import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import * as yup from "yup";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: string | null | undefined;
  confirm: boolean;
};

const defaultValue = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  image: "",
  confirm: false,
};

const schema = yup.object({
  username: yup.string().required("Un non d'utilisateur est attendu"),
  email: yup.string().email("Un email valide est attendue").required("Une email est attendu"),
  password: yup
    .string()
    .required("Un mot de passe est attendu")
    .min(8, "Le mot de passe doit faire 8 caracteres minimum"),
  confirmPassword: yup
    .string()
    .required("Une confirmation de mot de passer est attendue")
    .oneOf([yup.ref("password")], "La valeur de la confirmation doit matcher avec le password"),
  image: yup.string().nullable().optional(),
  confirm: yup
    .boolean()
    .required("La condition d'utilisation doivent etre accepter pour s'inscrire"),
});

export default function Register() {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema), defaultValues: defaultValue });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur serveur");
      }

      const newUser = await response.json();

      const { id } = newUser;

      if (!id) {
        throw new Error("Echec creation user");
      }

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=''>
      <form
        className='fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className='fieldset-legend'>Inscription</h2>

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

        <label htmlFor='email' className='label'>
          Email
        </label>
        <input
          type='email'
          className='input'
          placeholder='Email'
          id='email'
          {...register("email")}
        />
        {errors.email && <p className='text-red-500 italic font-bold'>{errors.email.message}</p>}

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

        <label className='label' htmlFor='confirmPassword'>
          Confirmation du mot de passe
        </label>
        <input
          type='password'
          className='input'
          placeholder='Confirmation du mot de passe'
          id='confirmPassword'
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className='text-red-500 italic font-bold'>{errors.confirmPassword.message}</p>
        )}

        <label htmlFor='image' className='label'>
          Image de profil
        </label>
        <input type='url' className='input' placeholder='@url' id='image' {...register("image")} />
        {errors.image && <p className='text-red-500 italic font-bold'>{errors.image.message}</p>}

        <label className='label' htmlFor='confirm'>
          <input type='checkbox' className='checkbox' id='confirm' {...register("confirm")} />
          J'accepte les condition d'utilisation
        </label>
        {errors.confirm && (
          <p className='text-red-500 italic font-bold'>{errors.confirm.message}</p>
        )}

        <Link to={"/login"}>J'ai deja un compte</Link>
        <Link to={"/"}>Condition d'utilisation</Link>

        <div className='flex justify-between'>
          <Link to={"/"} className='btn btn-neutral mt-4'>
            Retour
          </Link>
          <button className='btn btn-primary mt-4'>Login</button>
        </div>
      </form>
    </div>
  );
}
