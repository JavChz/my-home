import { useState, useEffect } from "react";
import "./WidgetExchangeRate.css";

function WidgetExchangeRate(props: Object): JSX.Element {
  const [dolar, setDolar] = useState("");
  const [loading, setLoading] = useState(true);
  const ApiURL =
    "https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno?token=57389428453f8d1754c30564b6b915070587dc7102dd5fff2f5174edd623c90b";
  useEffect(() => {
    fetch(ApiURL)
      .then((response) => {
        return response.json() ;
      })
      .then( (data) => {
        const dolarValue = Number(data.bmx.series[0].datos[0].dato);
        const currentExchange = `$1 MXN = ${dolarValue.toFixed(2)} USD`;
        setDolar(currentExchange);
        setLoading(false);
      });
  }, []);
  return (
    <div className="Widget">
      <h5 className="Widget__title">Tipo de cambio</h5>
      <div className="Widget__body">{!loading ? dolar : "Cargando..."}</div>
    </div>
  );
}

export { WidgetExchangeRate };
