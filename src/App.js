import { FormUploadFile } from "./components/FormUploadFile";
import { TableAppointments } from "./components/TableAppointments";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className={"app-wrapper"}>
        <h1>Загрузка файла csv в базу данных MONGO DB by Alexey Kovalev</h1>
        <FormUploadFile />
        <TableAppointments />
      </div>
    </div>
  );
}

export default App;
