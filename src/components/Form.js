import { useState } from "react";
import Loading from "./Loading";

const Form = ({ addData, postLoading }) => {
  // untuk type
  const [type, setType] = useState("");

  // untuk value
  const [form, setForm] = useState({
    name: "",
    description: "",
    nominal: "",
  });
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const { name, description, nominal } = form;

  const clearForm = () => {
    setType("");
    setForm({
      type: "",
      name: "",
      description: "",
      nominal: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // cuma alert
    alert(JSON.stringify(form, null, 2));

    addData({
      name,
      type,
      description,
      nominal: +nominal,
      createdAt: new Date().toISOString(),
    });

    clearForm();
  };

  const typeString =
    type === "income" ? "Pemasukan" : type === "expense" ? "Pengeluaran" : "";

  return (
    <div className="col-4">
      <form className="p-2" onSubmit={onSubmit}>
        <div className="form-group mb-1">
          <label>type</label>
          <select
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Pilih tipe</option>
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>
        </div>

        <div className="form-group mb-1">
          <label> Nama {typeString}</label>
          <input
            name="name"
            value={name}
            onChange={onChange}
            type="text"
            className="form-control"
            placeholder={`Nama dari ${typeString}`}
            disabled={!type}
          />
        </div>
        <div className="form-group mb-1">
          <label for="">Deskripsi</label>
          <textarea
            name="description"
            value={description}
            onChange={onChange}
            class="form-control"
            placeholder={`Masukan Deskripsi ${typeString}`}
            disabled={!type}
          ></textarea>
        </div>

        <div className="form-group mb-1">
          <label for="">Nominal</label>
          <input
            name="nominal"
            value={nominal}
            onChange={onChange}
            type="number"
            class="form-control"
            placeholder={`Masukan Nominal ${typeString}`}
            disabled={!type}
          ></input>
        </div>
        <div class="input-group mt-3">
          <button
            type="submit"
            className="btn btn-primary w-100 block"
            disabled={!type || postLoading}
          >
            {postLoading ? <Loading /> : "Simpan"}
          </button>
        </div>
      </form>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </div>
  );
};

export default Form;
