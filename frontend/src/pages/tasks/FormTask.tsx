import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required("Une valeur est attendue").trim(),
  describ: yup.string().notRequired().trim().default(""),
});

// type Inputs = yup.InferType<typeof schema>;
type Inputs = {
  title: string;
  describ?: string;
};

const defaultValue: Partial<Inputs> = {
  title: "",
  describ: "",
};

export default function FormTask({ handleNewTask }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ resolver: yupResolver(schema), defaultValues: defaultValue });

  function onSubmit(data) {
    handleNewTask(data);
    reset();
  }

  return (
    <div className='grid place-items-center'>
      <form action='' className='fieldset mx-auto' onSubmit={handleSubmit(onSubmit)}>
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
