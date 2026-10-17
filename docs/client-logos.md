# Client logos

26 database client names map to 27 local logo files. Petalii / Blumelii retains both brand marks. Assets were collected on 2026-10-15 from the ODC credentials supplied by the owner and official company sites. WOPP was confirmed by the owner as the Colombian photography app associated with wopp.co.

The database remains the source of client names, categories, order and custom links. `lib/client-branding.ts` resolves blank/placeholder/legacy-domain logo values to these local files; an explicit local image path or HTTP(S) image URL overrides the collection. No seed or production database write is needed. Unknown or failed logos use a labeled initial. Empty database categories are hidden.

BLU uses the historical BLU mark, not Rhenus: [Rhenus announced the rebrand in April 2025](https://www.rhenus.group/es/es/sala-de-prensa/el-grupo-rhenus-refuerza-su-presencia-en-america-latina-con-el-cambio-de-marca-de-blu-logistics-a-rhenus-logistics/). Merck follows the published merck.com URL (Merck & Co., not Merck KGaA). The collection documents provenance and does not grant trademark rights or imply that all references are direct ODC customers.

The white AB InBev, PepsiCo, Higgs and Schneider Electric variants receive dark logo surfaces; the other files receive white surfaces in either site theme. Images preserve their aspect ratios.

## Files and sources

Validation for v1.2.33 (2026-10-16): four client-branding regression tests and four startup-safety tests passed. Targeted ESLint reported no errors (four preexisting unused catch-variable warnings in the admin clients page). The production build, including TypeScript, passed. A local production server with the 26 documented public brands in a disposable SQLite database loaded all 27 images; the clients content also fit a 360px viewport. The global navigation retains its existing mobile layout. No production database was connected or modified for validation.

| Original asset | Brand | Source |
|---|---|---|
| [boostogether.svg](../public/clients/boostogether.svg) | Boostogether | [Fuente](https://boostogether.com) |
| [hyland.png](../public/clients/hyland.png) | Hyland | [Fuente](https://hyland.com) |
| [robinfood.png](../public/clients/robinfood.png) | RobinFood | [Fuente](https://www.robinfood.com/) |
| [ab-inbev.svg](../public/clients/ab-inbev.svg) | AB InBev | [Fuente](https://www.ab-inbev.com/) |
| [diageo.svg](../public/clients/diageo.svg) | Diageo | [Fuente](https://www.diageo.com/en) |
| [pepsico.png](../public/clients/pepsico.png) | Pepsico | [Fuente](https://www.pepsico.com/) |
| [petalli-blumelii.png](../public/clients/petalli-blumelii.png) | Petalli / Blumelii | [Fuente](https://docs.google.com/presentation/d/1RoaOdioTAh1-dtGRBwcKiWSh1kl9sHJB0Xx_T-q3_nQ/edit?slide=id.g3f9daf4df1d_1_175) |
| [blumelii.jpg](../public/clients/blumelii.jpg) | Blumelii | [Fuente](https://www.blumelii.com/) |
| [wopp.jpg](../public/clients/wopp.jpg) | WOPP | [Fuente](https://linktr.ee/wopp.co) |
| [avianca.png](../public/clients/avianca.png) | Avianca | [Fuente](https://docs.google.com/presentation/d/1RoaOdioTAh1-dtGRBwcKiWSh1kl9sHJB0Xx_T-q3_nQ/edit?slide=id.g3f9daf4df1d_1_175) |
| [blu-logistics.svg](../public/clients/blu-logistics.svg) | Blu Logistics | [Fuente](https://agenciadeaduanasblulogisticssanivel1.com/) |
| [ceramica-italia.png](../public/clients/ceramica-italia.png) | Cerámica Italia | [Fuente](https://docs.google.com/presentation/d/1RoaOdioTAh1-dtGRBwcKiWSh1kl9sHJB0Xx_T-q3_nQ/edit?slide=id.g3f9daf4df1d_1_175) |
| [schneider-electric.svg](../public/clients/schneider-electric.svg) | Schneider Electric | [Fuente](https://www.se.com/ww/en/about-us/newsroom/medias/folders/) |
| [motul.png](../public/clients/motul.png) | Motul | [Fuente](https://docs.google.com/presentation/d/1RoaOdioTAh1-dtGRBwcKiWSh1kl9sHJB0Xx_T-q3_nQ/edit?slide=id.g3f9daf4df1d_1_175) |
| [inser-fertility.png](../public/clients/inser-fertility.png) | InSer (Fertility) | [Fuente](https://www.inser.com.co/) |
| [pfizer.png](../public/clients/pfizer.png) | Pfizer | [Fuente](https://www.pfizer.com/) |
| [merck.svg](../public/clients/merck.svg) | Merck | [Fuente](https://www.merck.com/) |
| [c-botanique.png](../public/clients/c-botanique.png) | C Botanique | [Fuente](https://docs.google.com/presentation/d/1RoaOdioTAh1-dtGRBwcKiWSh1kl9sHJB0Xx_T-q3_nQ/edit?slide=id.g3f9daf4df1d_1_175) |
| [guaapa.png](../public/clients/guaapa.png) | Guaapa | [Fuente](https://docs.google.com/presentation/d/1RoaOdioTAh1-dtGRBwcKiWSh1kl9sHJB0Xx_T-q3_nQ/edit?slide=id.g3f9daf4df1d_1_175) |
| [sigma.png](../public/clients/sigma.png) | Sigma | [Fuente](https://docs.google.com/presentation/d/1RoaOdioTAh1-dtGRBwcKiWSh1kl9sHJB0Xx_T-q3_nQ/edit?slide=id.g3f9daf4df1d_1_175) |
| [higgs.png](../public/clients/higgs.png) | Higgs | [Fuente](https://docs.google.com/presentation/d/1RoaOdioTAh1-dtGRBwcKiWSh1kl9sHJB0Xx_T-q3_nQ/edit?slide=id.g3f9daf4df1d_1_175) |
| [mr-bricolage.webp](../public/clients/mr-bricolage.webp) | Mr Bricolage | [Fuente](https://mr-bricolage.com/) |
| [distribuciones-dpjd.png](../public/clients/distribuciones-dpjd.png) | Distribuciones DPJD | [Fuente](https://docs.google.com/presentation/d/1RoaOdioTAh1-dtGRBwcKiWSh1kl9sHJB0Xx_T-q3_nQ/edit?slide=id.g3f9daf4df1d_1_175) |
| [distribuciones-la-integridad.png](../public/clients/distribuciones-la-integridad.png) | Distribuciones La Integridad | [Fuente](https://docs.google.com/presentation/d/1RoaOdioTAh1-dtGRBwcKiWSh1kl9sHJB0Xx_T-q3_nQ/edit?slide=id.g3f9daf4df1d_1_175) |
| [grupo-bolivar.png](../public/clients/grupo-bolivar.png) | Grupo Bolívar | [Fuente](https://www.grupobolivar.com.co/) |
| [fundacion-texmodas.png](../public/clients/fundacion-texmodas.png) | Fundación Texmodas | [Fuente](https://fundaciontexmodas.org.co/) |
| [camara-de-comercio-de-cucuta.png](../public/clients/camara-de-comercio-de-cucuta.png) | Cámara de Comercio de Cúcuta | [Fuente](https://cccucuta.org.co/) |
