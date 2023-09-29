<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xmlns:ogc="http://www.opengis.net/ogc"
   xmlns:se="http://www.opengis.net/se" version="1.1.0"
   xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.1.0/StyledLayerDescriptor.xsd">
   <NamedLayer>
      <se:Name>RpJuridiskLinje</se:Name>
      <UserStyle>
         <se:Name>RpJuridiskLinje</se:Name>
         <se:FeatureTypeStyle>
            <se:Rule>
               <se:Name>1203 - Regulert tomtegrense</se:Name>
               <se:Description>
                  <se:Title>1203 - Regulert tomtegrense</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1203</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">1</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1204 - Eiendomsgrense som skal oppheves</se:Name>
               <se:Description>
                  <se:Title>1204 -Eiendomsgrense som skal oppheves</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1204</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">1</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                     <se:SvgParameter name="stroke-dasharray">7 5</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:GraphicStroke>
                        <se:Graphic>
                           <se:ExternalGraphic>
                              <se:OnlineResource xlink:type="simple" xlink:href="https://register.geonorge.no/symbol/files/reguleringsplanforslag/juridisk-linje-1204.svg" />
                              <se:Format>image/svg+xml</se:Format>
                           </se:ExternalGraphic>
                           <se:Size>11</se:Size>
                           <se:Rotation>
                              <ogc:Literal>0</ogc:Literal>
                           </se:Rotation>
                        </se:Graphic>
                        <se:Gap>
                           <ogc:Literal>27</ogc:Literal>
                        </se:Gap>
                     </se:GraphicStroke>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1210 - Bygg, kulturminner, m.m. som skal bevares</se:Name>
               <se:Description>
                  <se:Title>1210 - Bygg, kulturminner, m.m. som skal bevares</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1210</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">4</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1211 - Byggegrense</se:Name>
               <se:Description>
                  <se:Title>1211 - Byggegrense</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1211</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">1</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                     <se:SvgParameter name="stroke-dasharray">14 7</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1213 - Planlagt bebyggelse</se:Name>
               <se:Description>
                  <se:Title>1213 - Planlagt bebyggelse</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1213</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">1</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1214 - Bebyggelse som inngår i planen </se:Name>
               <se:Description>
                  <se:Title>1214 - Bebyggelse som inngår i planen </se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1214</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">2</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1215 - Bebyggelse som forutsettes fjernet</se:Name>
               <se:Description>
                  <se:Title>1215 - Bebyggelse som forutsettes fjernet</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1215</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">1</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                     <se:SvgParameter name="stroke-dasharray">7 7</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1221 - Regulert senterlinje</se:Name>
               <se:Description>
                  <se:Title>1221 - Regulert senterlinje</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1221</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">1</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                     <se:SvgParameter name="stroke-dasharray">29 7 1 7</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1222 - Frisiktlinje</se:Name>
               <se:Description>
                  <se:Title>1222 - Frisiktlinje</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1222</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">1</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                     <se:SvgParameter name="stroke-dasharray">7 4</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1223 - Regulert kant kjørebane </se:Name>
               <se:Description>
                  <se:Title>1223 - Regulert kant kjørebane </se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1223</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">1</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                     <se:SvgParameter name="stroke-dasharray">14 4 4 4</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1224 - Regulert kjørefelt</se:Name>
               <se:Description>
                  <se:Title>1224 - Regulert kjørefelt</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1224</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">1</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                     <se:SvgParameter name="stroke-dasharray">9 7 1 7</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1225 - Regulert parkeringsfelt</se:Name>
               <se:Description>
                  <se:Title>1225 - Regulert parkeringsfelt</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1225</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">1</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                     <se:SvgParameter name="stroke-dasharray">5 4</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1226 - Regulert fotgjengerfelt</se:Name>
               <se:Description>
                  <se:Title>1226 - Regulert fotgjengerfelt</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1226</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">1</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                     <se:SvgParameter name="stroke-dasharray">4 2</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1227 - Regulert støyskjerm</se:Name>
               <se:Description>
                  <se:Title>1227 - Regulert støyskjerm</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1227</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:GraphicStroke>
                        <se:Graphic>
                           <se:ExternalGraphic>
                              <se:OnlineResource xlink:type="simple" xlink:href="https://register.geonorge.no/symbol/files/reguleringsplanforslag/juridisk-linje-1227.svg" />
                              <se:Format>image/svg+xml</se:Format>
                           </se:ExternalGraphic>
                           <se:Size>9</se:Size>
                        </se:Graphic>
                        <se:Gap>
                           <ogc:Literal>10</ogc:Literal>
                        </se:Gap>
                     </se:GraphicStroke>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1228 - Regulert støttemur</se:Name>
               <se:Description>
                  <se:Title>1228 - Regulert støttemur</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1228</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">1</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:GraphicStroke>
                        <se:Graphic>
                           <se:ExternalGraphic>
                              <se:OnlineResource xlink:type="simple" xlink:href="https://register.geonorge.no/symbol/files/reguleringsplanforslag/svart-halv-linje.svg" />
                              <se:Format>image/svg+xml</se:Format>
                           </se:ExternalGraphic>
                           <se:Size>18</se:Size>
                           <se:Rotation>
                              <ogc:Literal>0</ogc:Literal>
                           </se:Rotation>
                        </se:Graphic>
                        <se:Gap>
                           <ogc:Literal>3</ogc:Literal>
                        </se:Gap>
                     </se:GraphicStroke>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1235 - Sikringsgjerde</se:Name>
               <se:Description>
                  <se:Title>1235 - Sikringsgjerde</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1235</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">1</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:GraphicStroke>
                        <se:Graphic>
                           <se:ExternalGraphic>
                              <se:OnlineResource xlink:type="simple" xlink:href="https://register.geonorge.no/symbol/files/reguleringsplanforslag/juridisk-linje-1235.svg" />
                              <se:Format>image/svg+xml</se:Format>
                           </se:ExternalGraphic>
                           <se:Size>11</se:Size>
                           <se:Rotation>
                              <ogc:Literal>0</ogc:Literal>
                           </se:Rotation>
                        </se:Graphic>
                        <se:Gap>
                           <ogc:Literal>78</ogc:Literal>
                        </se:Gap>
                     </se:GraphicStroke>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1252 - Bru</se:Name>
               <se:Description>
                  <se:Title>1252 - Bru</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1252</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">2</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                     <se:SvgParameter name="stroke-dasharray">18 4</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1254 - Tunnel</se:Name>
               <se:Description>
                  <se:Title>1254 - Tunnel</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1254</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">2</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                     <se:SvgParameter name="stroke-dasharray">4 4</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1259 - Måle og avstandslinje</se:Name>
               <se:Description>
                  <se:Title>1259 - Måle og avstandslinje</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1259</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:VendorOption name="placement">lastPoint</se:VendorOption>
                  <se:Stroke>
                     <se:GraphicStroke>
                        <se:Graphic>
                           <se:ExternalGraphic>
                              <se:OnlineResource xlink:href="https://register.geonorge.no/symbol/files/reguleringsplanforslag/juridisk-linje-1259.svg" xlink:type="simple"/>
                              <se:Format>image/svg+xml</se:Format>
                           </se:ExternalGraphic>
                           <!-- For kompatibilitet med QGIS - START -->
                           <se:Mark>
                              <se:WellKnownName>square</se:WellKnownName>
                              <se:Fill>
                                 <se:SvgParameter name="fill">#000000</se:SvgParameter>
                              </se:Fill>
                              <se:Stroke>
                                 <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                                 <se:SvgParameter name="stroke-width">0.5</se:SvgParameter>
                              </se:Stroke>
                           </se:Mark>
                           <!-- For kompatibilitet med QGIS - SLUTT -->
                           <se:Size>11</se:Size>
                           <se:Rotation>
                              <ogc:Literal>25</ogc:Literal>
                           </se:Rotation>
                        </se:Graphic>
                     </se:GraphicStroke>
                  </se:Stroke>
               </se:LineSymbolizer>
               <se:LineSymbolizer>
                  <se:VendorOption name="placement">firstPoint</se:VendorOption>
                  <se:Stroke>
                     <se:GraphicStroke>
                        <se:Graphic>
                           <se:ExternalGraphic>
                              <se:OnlineResource xlink:href="https://register.geonorge.no/symbol/files/reguleringsplanforslag/juridisk-linje-1259.svg" xlink:type="simple"/>
                              <se:Format>image/svg+xml</se:Format>
                           </se:ExternalGraphic>
                           <!-- For kompatibilitet med QGIS - START -->
                           <se:Mark>
                              <se:WellKnownName>square</se:WellKnownName>
                              <se:Fill>
                                 <se:SvgParameter name="fill">#000000</se:SvgParameter>
                              </se:Fill>
                              <se:Stroke>
                                 <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                                 <se:SvgParameter name="stroke-width">0.5</se:SvgParameter>
                              </se:Stroke>
                           </se:Mark>
                           <!-- For kompatibilitet med QGIS - SLUTT -->
                           <se:Size>11</se:Size>
                           <se:Rotation>
                              <ogc:Literal>25</ogc:Literal>
                           </se:Rotation>
                        </se:Graphic>
                     </se:GraphicStroke>
                  </se:Stroke>
               </se:LineSymbolizer>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">1</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1260 - Strandlinje sjø</se:Name>
               <se:Description>
                  <se:Title>1260 - Strandlinje sjø</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1260</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#999999</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">4</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                     <se:SvgParameter name="stroke-dasharray">18 7</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1261 - Strandlinje vassdrag</se:Name>
               <se:Description>
                  <se:Title>1261 - Strandlinje vassdrag</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1261</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#999999</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">4</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                     <se:SvgParameter name="stroke-dasharray">18 7</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
            <se:Rule>
               <se:Name>1262 - Midtlinje vassdrag</se:Name>
               <se:Description>
                  <se:Title>1262 - Midtlinje vassdrag</se:Title>
               </se:Description>
               <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
                  <ogc:PropertyIsEqualTo>
                     <ogc:PropertyName>juridiskLinjetype</ogc:PropertyName>
                     <ogc:Literal>1262</ogc:Literal>
                  </ogc:PropertyIsEqualTo>
               </ogc:Filter>
               <se:LineSymbolizer>
                  <se:Stroke>
                     <se:SvgParameter name="stroke">#000000</se:SvgParameter>
                     <se:SvgParameter name="stroke-width">1</se:SvgParameter>
                     <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
                     <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
                     <se:SvgParameter name="stroke-dasharray">14 7 1 7</se:SvgParameter>
                  </se:Stroke>
               </se:LineSymbolizer>
            </se:Rule>
         </se:FeatureTypeStyle>
      </UserStyle>
   </NamedLayer>
</StyledLayerDescriptor>
