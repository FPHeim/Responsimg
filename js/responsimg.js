/* 
 * Responsimg 
 * version: ALPHA 0.1
 * by FPH
 * 
 * Change the SRC of the images using CSS media queries
 * 
 * Use with caution
 * 
 * Based on: http://adactio.com/journal/5429/
 */

(function($) {
    $.Responsimg = function(options) {
        
        var settings = $.extend( {
            defaultPrefix: ''
        }, options);
        
        /**     
         * Cambia las imágenes según el valor content especificado en CSS.
         */
        function doResposimg () {
            var prefix = settings.defaultPrefix; // cargar valor por defecto
            
            if ( typeof(window.getComputedStyle) == 'function' ) {
                // Se puede usar window.getComputedStyle
                prefix = window
                    .getComputedStyle($('body')[0], ':after')
                    .getPropertyValue('content');
            }

            $('img[data-responsimg], img.responsimg').each(function () {
                var imgSrc = '', 
                    newPrefix = '',
                    newSrc = '';

                // Obtener ruta de la imagen correspondiente:
                if ($(this).attr('data-responsimg')) {
                    imgSrc = $(this).attr('data-responsimg');
                } else {
                    imgSrc = $(this).attr('src');
                }
            
                // Crear ruta de la nueva imagen:
                srcParts = /([\w-/]+)\/([\w-/]+)\.(\w{3})/.exec(imgSrc);
            
                newSrc = srcParts[1] + "/"; // directorio de la imagen
            
                // nombre de la imagen. Firefox/Opera/IE returns 'none' if no style was applied
                if (prefix && prefix !== "none") {
                    newPrefix = prefix.replace(/['"]/g,'') + "-";
                }
            
                imgName = /([\w]+)-([\w-/]+)/.exec(srcParts[2]); // controlar si actualmente tiene prefijo

                if(imgName) {
                    newSrc += newPrefix + imgName[2];
                } else {
                    newSrc += newPrefix + srcParts[2];
                }
            
                newSrc += "." + srcParts[3]; // extensión de la imagen
            
                // @todo Check if the newSrc file exists
            
                // Reemplazar atributo SRC
                $(this).attr('src', newSrc);
            });        
        } // Fin doResponsimg()
                
        // Cargar SRC de las imágenes
        doResposimg();
                
        // Cambiar imágenes al redimensionar la pantalla
        $(window).resize(function () {
            doResposimg();
        });
    }
})(jQuery);