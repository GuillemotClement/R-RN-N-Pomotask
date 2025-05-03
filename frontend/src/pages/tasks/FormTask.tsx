import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required("Une valeur est attendue"),
  describ: yup.string().optional().default(""),
});

type Inputs = yup.InferType<typeof schema>;

const defaultValue: Partial<Inputs> = {
  title: "",
  describ: "",
};

export default function FormTask() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema), defaultValues: defaultValue });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    type taskData = {
      title: string;
      describ?: string;
    };
    const fullURL = `http://localhost:8080/tasks`;
    try {
      const taskData: taskData = {
        title: data.title,
        describ: data.describ,
      };

      const tokenJWT = localStorage.getItem("token") ?? "";

      const response = await fetch(fullURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenJWT,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Erreur serveur");
      }

      //utiliser fonction pour passer la task dans le composant parent pour le state pour l'affichage

      const task = await response.json();
      console.log(task);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=''>
      <form action='' className='fieldset border' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='title' className='label'>
          Titre
        </label>
        <input type='text' className='input' {...register("title")} />
        {errors.title && <p className='text-red-500 italic font-bold'>{errors.title.message}</p>}

        <label htmlFor='describ' className='describ'>
          Description
        </label>
        <textarea
          id='describ'
          placeholder='Description de la tache'
          className='textarea'
          {...register("describ")}
        ></textarea>
        {errors.describ && (
          <p className='text-red-500 italic font-bold'>{errors.describ.message}</p>
        )}

        <div className=''>
          <button className='btn btn-primary'>Ajouter</button>
        </div>
      </form>
    </div>
  );
}
