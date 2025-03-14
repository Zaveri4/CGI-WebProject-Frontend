# CGI-WebProject-Backend

See on lennureisijale lennu planeerimise ja lennukis istekohtade soovitamise veebirakendus,
mis võimaldab valida endale sobivat lennureisi ja saada istekohti enda soovituste põhjal.
Kasutaja saab valida lennureisi kasutades erinevaid filtreid (kas leida lennureisi sihtkoha, hinna või kuupäeva järgi).
Kui kasutaja leidis endale sobivat reisi, siis talle pakutakse välja vaba istekohta/istekohti ja ta saab ise valida, mida ta eelistab.
Näiteks, kas kasutaja tahab istekohta akna all, kas rohkem jalaruumi või lähedal väljapääsule.
Kui aga kasutaja plaanib osta mitu piletit, siis talle pakutakse välja istekohti, mis on kõrvuti.
Kogu info dünaamiliselt muutub sõltuvalt kasutaja eelistustest.

## Tech Stack

- **React (TypeScript)**
- **Vite**
- **Bootstrap** (kasutaja liidese stiiliks)
- **React Router** (navigatsiooniks)
- **Axios** (API päringuteks)
- **Docker** (frontend'i käevitamiseks)

## Kuidas rakendust käivatada

**NB! Backend ja Docker Desktop peavad olema käivitatud!** 

1. Esiteks on vaja klonida repository kas WebStorm'isse või teise IDE.
2. Järgmiseks on vaja seadistada sõltuvusi käsuga: `npm install`
3. Viimaseks on vaja käivitada frontendi Docker konteineris käsuga: `docker-compose up -d --build`

Kui kõik on õigesti tehtud, siis frontend on avatud linkil: `http://localhost:5173` ja rakendust on võimalik kasutada.

## Aega kuulunud frontendi loomiseks umbes 35+ tundi.

## Raskused

- Mul on väike kogemus frontendi loomises, siis ma pidin kasutama igasugused abivahendid, et valmistada midagi, mis ilusti välja näeks.
Inspiratsiooniks mul oli oma ülikooli projekt, kus kasutatakse samad vahendid, mis ma kasutasin siin.
Ülikooli projekti repo: `https://gitlab.cs.taltech.ee/kokiss/iti0302-2024-frontend`.
Samuti kasutasin AI Grok'i abi, et kirjutada kõike stiile, mida kasutatakse frontendis.
