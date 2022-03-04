import React from "react";
import { useForm } from "react-hook-form";
const URI =
  "https://some-random-api.ml/canvas/youtube-comment?username={{name}}&comment={{comment}}&avatar={{avatar}}";

const Imagen = () => {
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [error, setError] = React.useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isImagen = (file) => {
      const regexURLImagen = /^.*\.(jpg|png|jpeg|gif)$/;
      if(!regexURLImagen.test(file)) {
          setError("El archivo no es una imagen");
          return true;
      };

      //is imagen fetch
      let date;
      fetch(file)
        .then(res => {
            date = false
        })
        .catch(err => {
            console.log(err);
            date = true;
            setError("Parece que la imagen no existe")
        })

        return date;
    
  }

  const onSubmit = (data) => {
    setLoading(true);
    setError(null);
    if(isImagen(data.avatar)) return;
    setTimeout(() => {
      setLoading(false);
      setImage(
        URI.replace("{{name}}", data.name)
          .replace("{{comment}}", data.comment)
          .replace("{{avatar}}", data.avatar)
      );
    }, 3000);
  };

  const Imagen = ({ image }) => {
    return (
      <div className="w-10/12 bg-slate-100 p-2 m-2 rounded">
        <img src={image} alt="imagen" className="rounded"/>
      </div>
    );
  };

  return (
    <section className="flex justify-center items-center flex-col mt-2">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row p-2 bg-slate-300 rounded lg:flex-row">
        <input
          type="text"
          className="p-2 text-center bg-slate-200 m-1"
          placeholder="nombre"
          {...register("name", { required: true, maxLength: 80 })}
        />
        <input
          type="text"
          className="p-2 text-center bg-slate-200 m-1"
          placeholder="comentario"
          {...register("comment", { required: true, maxLength: 100 })}
        />
        <input
          type="text"
          className="p-2 text-center bg-slate-200 m-1"
          placeholder="avatar"
          {...register("avatar", { required: true })}
        />

        <input
          type="submit"
          className="bg-emerald-400 p-2 text-center rounded"
        />
      </form>
      {loading && <div className="text-slate-100">Loading...</div>}
      {error && <div>{error}</div>}

      {!loading && image && !error && <Imagen image={image} />}
    </section>
  );
};

export default Imagen;
