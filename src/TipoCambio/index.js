import { useState, useEffect } from "react";
import './TipoCambio.css'
function TipoCambio() {
  const [dolar, setDolar] = useState(0);
	const [loading, setLoading] = useState(true);
  const ApiURL = "https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno?token=57389428453f8d1754c30564b6b915070587dc7102dd5fff2f5174edd623c90b";
	useEffect(() => {
		
    fetch(ApiURL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
				setLoading(false);
        setDolar(data.bmx.series[0].datos[0].dato);
      });
  }, []);
	if(loading){
		return <div className="TipoCambio">Cargando...</div>
	}
  return <div className="TipoCambio">$1 MXN = ${ Number(dolar).toFixed(2) } USD</div>;
}

export { TipoCambio };
