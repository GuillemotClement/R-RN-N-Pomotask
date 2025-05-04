import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required("Une valeur est attendue").trim(),
  describ: yup.string().notRequired().trim().default(""),
});

type Inputs = {
  title: string;
  describ: string | null;
};

const defaultValue: Partial<Inputs> = {
  title: "",
  describ: "",
};

type FormTaskProps = {
  handleNewTask: (data: Inputs) => void;
};

export default function FormTask({ handleNewTask }: FormTaskProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ resolver: yupResolver(schema), defaultValues: defaultValue });

  function onSubmit(data: Inputs) {
    handleNewTask(data);
    reset();
  }

  return (
    <div className='grid place-items-center w-full'>
      <form
        action=''
        className='flex flex-col w-full p-2 gap-y-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col'>
          <label htmlFor='title' className='label'>
            Titre
          </label>
          <input type='text' className='input w-full' {...register("title")} />
          {errors.title && <p className='text-red-500 italic font-bold'>{errors.title.message}</p>}
        </div>

        <div className='flex flex-col'>
          <label htmlFor='describ' className='label'>
            Description
          </label>
          <textarea id='describ' className='textarea w-full' {...register("describ")}></textarea>
          {errors.describ && (
            <p className='text-red-500 italic font-bold'>{errors.describ.message}</p>
          )}
        </div>

        <div className='flex justify-center'>
          <button className='btn btn-primary'>Ajouter</button>
        </div>
      </form>
    </div>
  );
}
