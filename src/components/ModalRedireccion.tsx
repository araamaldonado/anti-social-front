import { useEffect, useState } from "react"
import candadoImg from "../assets/candadoPNG.png"
import { useNavigate } from "react-router-dom"


function ModalRedireccion() {
  const [modalActivo, setModalActivo] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthError = () => {
      setModalActivo(true)
    }
    window.addEventListener("auth_error", handleAuthError);
    return () => {
        window.removeEventListener("auth_error", handleAuthError);
        }
  }, [navigate])

  const handleButton = () => {
    setModalActivo(false)
  }

  return (
    <div>
      {modalActivo && (
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        style={{ backgroundColor: "#ffec" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center">
            <div className="modal-body">
              <img
                src={candadoImg}
                alt="Sesión expirada"
                style={{ width: "90px" }}
                className="mb-3"
              />
              <h3 className="mb-2">
                Por seguridad, la sesión ha expirado
              </h3>
              <button className="btn btn-dark m-2"
                onClick={handleButton}>
                Iniciar sesión
                </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  )
}

export default ModalRedireccion
