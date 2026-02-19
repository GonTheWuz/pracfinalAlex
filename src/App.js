import { useEffect } from "react";
import googleOneTap from "google-one-tap";
import Column from "./components/colum";
import NewTaskForm from "./components/newtaskform";
import { useAuth } from "./context/AuthContext";

const GOOGLE_CLIENT_ID =
  "529913603954-difqfmh88u1a669lnq79dobjrsbsthkm.apps.googleusercontent.com";

const App = () => {
  const { user, login, logout } = useAuth();

  useEffect(() => {
    if (user) return;

    googleOneTap({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response) => {
        login(response.credential);
      },
    });
  }, [user, login]);

  return (
    <div>
      <h1>Gestor de Tareas</h1>

      {user ? (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={user.picture} alt="perfil" width="40" />
            <span>{user.name}</span>
            <button onClick={logout}>Cerrar sesión</button>
          </div>

          <NewTaskForm author={user.name} />

          <div style={{ display: "flex", gap: "20px" }}>
            <Column title="Pendientes" status="todo" />
            <Column title="En Progreso" status="in-progress" />
            <Column title="Completadas" status="done" />
          </div>
        </>
      ) : (
        <p>Inicia sesión con Google para acceder al gestor de tareas</p>
      )}
    </div>
  );
};

export default App;
