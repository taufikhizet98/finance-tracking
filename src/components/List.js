import { FaTrash } from "react-icons/fa";
import Loading from "./Loading";

const List = (props) => {
  const filteredData = props.data?.filter((item) => item.type === props.type);

  const formatToRupiah = (e) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(e);
  };

  return (
    <div className={`col-4 bg-${props.bg} p-3 `}>
      <h2 className="text-white text-center">
        {props.type === "income" ? "Pemasukan" : "Pengeluaran"}
      </h2>

      <div
        className={
          props.loading
            ? " d-flex align-item-center h-100 w-100 justify-content-center"
            : ""
        }
      >
        {props.loading ? (
          <Loading />
        ) : (
          <>
            <h5 className="text-center text-white">
              {formatToRupiah(
                filteredData?.reduce((acc, curr) => acc + curr.nominal, 0)
              )}
            </h5>

            <ul className="list-group">
              {filteredData?.map((item) => (
                <li
                  className="list-group-item justify-content-between d-flex"
                  key={item.id}
                >
                  <span>{item.name}</span>
                  <div>
                    <span className="pr-2">{formatToRupiah(item.nominal)}</span>
                    <FaTrash
                      className="text-danger"
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                      onClick={() => props.removeData(item.id)}
                    ></FaTrash>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default List;
