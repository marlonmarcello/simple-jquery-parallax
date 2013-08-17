/*
 *  jQuery Boilerplate - v3.3.1
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    $.fn.parallax = function(options) {
        var defaults = {
            mover: 500,
            speed: 1,
            parent: false
        };
        var options = $.extend(defaults, options);
        var element = this;
        
        var topInicial = $(element).offset().top;

        /* **************************************************** 
                      Descobrindo o top final
        **************************************************** */
        /* Retira a quantidade a se mover do top atual do objeto para descobrir qual será sua posição final */
        var topFinal = topInicial - options.mover;

        /* Se o total a se mover for maior que a posicao inicial, seu valor será negativo e sairá do documento.
        Para evitar erros no calculo, é diluido esse restando negativo nos movimentos.
        A quantidade negativa somado a quantidade a se mover mostram o resultado da posição 0, então a quantidade negativa
        dividida pelo valor que será andado é o resultado desse valor diluido que será multiplicado
        Exemplo: -300px / (-300px + 600px) */
        if(topFinal < 0){          
          var restante = (topFinal / (topFinal + options.mover)) * -1;
          topFinal = -1;
        }                
        
        $(window).bind('scroll', function(){        

          /* **************************************************** 
                                  Movendo
          **************************************************** */
          var scrollAtual = $(this).scrollTop();          
  
          /* Se o scroll estiver entre o top final e o inicial */
          if(scrollAtual >= topFinal && scrollAtual <= topInicial){
            
            if(topFinal > 0){
              /* ****** Se o top final desejado for maior que 0 ***** 
              É retirado a diferença entre o top atual e o top final, e o resultado é diminuido do top incial 
              exemplo: 1500px - (1200px - 1000px) = 1300px
              O resultado é a o novo top do objeto */
              var dif = topInicial - (scrollAtual - topFinal);
            }else if(topFinal < 0){

              /* ****** Se o top final desejado for menor que 0 ***** 
              A diferença a ser andada é multiplicada pelo restante diluido que ultrapassou 0 
              Dando uma sensacao de que andou mais em menos tempo */
              var dif = topInicial - ((scrollAtual - topFinal) * restante);
            }else{
              /* ****** Se o top final desejado for igual a 0 ***** 
              A diferença é o scroll atual menos o top inicial */
              var dif = topInicial - scrollAtual;
            }

            /* **************************************************** 
                                  Velocidade
            **************************************************** */
            /* A velocidade nessa lógica vem da idéia de mover mais pixels pela mesma quantidade de scroll.
            Dividindo a quantidade a se mover pela velocidade nós temos a quantidade de pixels a mais pra se mover.
            Dividindo essa quantidade a mais que precisa mover pela quantidade que será movida temos o fator multiplicador da diferenca. */
            dif = dif * ((options.mover / options.speed) / options.mover);
            console.log(dif);
            $(element).css({top: dif});

          }else if($(element).offset().top <= topFinal){

            /* Caso o objeto ja tenha alcancado seu ideal */
            $(element).css({top: topFinal});
          }else if(scrollAtual < topInicial){

            /* Caso o scroll ainda nao chegou dentro da area de movimento do objeto, mantem o mesmo no top inicial */
            $(element).css({top: topInicial}); 
          }
        });
    };

})( jQuery, window, document );
