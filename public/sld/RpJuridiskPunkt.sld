<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xmlns:ogc="http://www.opengis.net/ogc"
   xmlns:se="http://www.opengis.net/se" version="1.1.0"
   xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.1.0/StyledLayerDescriptor.xsd">
   <NamedLayer>
      <se:Name>RpJuridiskPunkt</se:Name>
      <UserStyle>
         <se:Name>RpJuridiskPunkt</se:Name>
         <se:FeatureTypeStyle>
            <se:Rule>
               <se:Name>1231 - Vegstengning/fysisk kjøresperre</se:Name>
               <se:Description>
                  <se:Title>1231 - Vegstengning/fysisk kjøresperre</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskPunkttype</ogc:PropertyName>
                     <ogc:Literal>1231</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:PointSymbolizer>
                  <se:Graphic>
                     <se:ExternalGraphic>
                        <se:OnlineResource xlink:type="simple" xlink:href="https://register.geonorge.no/symbol/files/reguleringsplanforslag/juridisk-punkt-1231.svg" />
                        <se:Format>image/svg+xml</se:Format>
                     </se:ExternalGraphic>
                     <se:Size>26</se:Size>
                  </se:Graphic>
               </se:PointSymbolizer>
            </se:Rule>         
            <se:Rule>
               <se:Name>1241 - Stenging av avkjørsel</se:Name>
               <se:Description>
                  <se:Title>1241 - Stenging av avkjørsel</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskPunkttype</ogc:PropertyName>
                     <ogc:Literal>1241</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:PointSymbolizer>
                  <se:Graphic>
                     <se:ExternalGraphic>
                        <se:OnlineResource xlink:type="simple" xlink:href="https://register.geonorge.no/symbol/files/reguleringsplanforslag/juridisk-punkt-1241.svg" />
                        <se:Format>image/svg+xml</se:Format>
                     </se:ExternalGraphic>
                     <se:Size>18</se:Size>
                  </se:Graphic>
               </se:PointSymbolizer>
            </se:Rule>       
            <se:Rule>
               <se:Name>1242 - Avkjørsel</se:Name>
               <se:Description>
                  <se:Title>1242 - Avkjørsel</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskPunkttype</ogc:PropertyName>
                     <ogc:Literal>1242</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:PointSymbolizer>
                  <se:Graphic>
                     <se:ExternalGraphic>
                        <se:OnlineResource xlink:type="simple" xlink:href="https://register.geonorge.no/symbol/files/reguleringsplanforslag/juridisk-punkt-1242.svg" />
                        <se:Format>image/svg+xml</se:Format>
                     </se:ExternalGraphic>
                     <se:Size>26</se:Size>
                  </se:Graphic>
               </se:PointSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1243 - Innkjøring</se:Name>
               <se:Description>
                  <se:Title>1243 - Innkjøring</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskPunkttype</ogc:PropertyName>
                     <ogc:Literal>1243</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:PointSymbolizer>
                  <se:Graphic>
                     <se:ExternalGraphic>
                        <se:OnlineResource xlink:type="simple" xlink:href="https://register.geonorge.no/symbol/files/reguleringsplanforslag/juridisk-punkt-1243.svg" />
                        <se:Format>image/svg+xml</se:Format>
                     </se:ExternalGraphic>
                     <se:Size>16</se:Size>
                  </se:Graphic>
               </se:PointSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1244 - Utkjøring</se:Name>
               <se:Description>
                  <se:Title>1244 - Utkjøring</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskPunkttype</ogc:PropertyName>
                     <ogc:Literal>1244</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:PointSymbolizer>
                  <se:Graphic>
                     <se:ExternalGraphic>
                        <se:OnlineResource xlink:type="simple" xlink:href="https://register.geonorge.no/symbol/files/reguleringsplanforslag/juridisk-punkt-1244.svg" />
                        <se:Format>image/svg+xml</se:Format>
                     </se:ExternalGraphic>
                     <se:Size>16</se:Size>
                  </se:Graphic>
               </se:PointSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1251 - Brukar</se:Name>
               <se:Description>
                  <se:Title>1251 - Brukar</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskPunkttype</ogc:PropertyName>
                     <ogc:Literal>1251</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:PointSymbolizer>
                  <se:Graphic>
                     <se:ExternalGraphic>
                        <se:OnlineResource xlink:type="simple" xlink:href="https://register.geonorge.no/symbol/files/reguleringsplanforslag/juridisk-punkt-1251.svg" />
                        <se:Format>image/svg+xml</se:Format>
                     </se:ExternalGraphic>
                     <se:Size>18</se:Size>
                  </se:Graphic>
               </se:PointSymbolizer>
            </se:Rule>             
            <se:Rule>
               <se:Name>1253 - Tunnelåpning</se:Name>
               <se:Description>
                  <se:Title>1253 - Tunnelåpning</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskPunkttype</ogc:PropertyName>
                     <ogc:Literal>1253</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:PointSymbolizer>
                  <se:Graphic>
                     <se:ExternalGraphic>
                        <se:OnlineResource xlink:type="simple" xlink:href="https://register.geonorge.no/symbol/files/reguleringsplanforslag/juridisk-punkt-1253.svg" />
                        <se:Format>image/svg+xml</se:Format>
                     </se:ExternalGraphic>
                     <se:Size>18</se:Size>
                  </se:Graphic>
               </se:PointSymbolizer>
            </se:Rule>            
            <se:Rule>
               <se:Name>1271 - Eksisterende tre som skal bevares</se:Name>
               <se:Description>
                  <se:Title>1271 - Eksisterende tre som skal bevares</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskPunkttype</ogc:PropertyName>
                     <ogc:Literal>1271</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:PointSymbolizer>
                  <se:Graphic>
                     <se:ExternalGraphic>
                        <se:OnlineResource xlink:type="simple" xlink:href="https://register.geonorge.no/symbol/files/reguleringsplanforslag/juridisk-punkt-1271.svg" />
                        <se:Format>image/svg+xml</se:Format>
                     </se:ExternalGraphic>
                     <se:Size>25</se:Size>
                  </se:Graphic>
               </se:PointSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1272 - Regulert nytt tre</se:Name>
               <se:Description>
                  <se:Title>1272 - Regulert nytt tre</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskPunkttype</ogc:PropertyName>
                     <ogc:Literal>1272</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:PointSymbolizer>
                  <se:Graphic>
                     <se:ExternalGraphic>
                        <se:OnlineResource xlink:type="simple" xlink:href="https://register.geonorge.no/symbol/files/reguleringsplanforslag/juridisk-punkt-1272.svg" />
                        <se:Format>image/svg+xml</se:Format>
                     </se:ExternalGraphic>
                     <se:Size>25</se:Size>
                  </se:Graphic>
               </se:PointSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1273 - Regulert møneretning</se:Name>
               <se:Description>
                  <se:Title>1273 - Regulert møneretning</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskPunkttype</ogc:PropertyName>
                     <ogc:Literal>1273</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:PointSymbolizer>
                  <se:Graphic>
                     <se:ExternalGraphic>
                        <se:OnlineResource xlink:type="simple" xlink:href="https://register.geonorge.no/symbol/files/reguleringsplanforslag/juridisk-punkt-1273.svg" />
                        <se:Format>image/svg+xml</se:Format>
                     </se:ExternalGraphic>
                     <se:Size>30</se:Size>
                  </se:Graphic>
               </se:PointSymbolizer>
            </se:Rule>
         </se:FeatureTypeStyle>
      </UserStyle>
   </NamedLayer>
</StyledLayerDescriptor>
