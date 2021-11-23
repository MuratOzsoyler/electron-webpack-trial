module App where

import Prelude

import Counter (mkCounter)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Console as Console
import React.Basic.DOM (render)
import Web.DOM.NonElementParentNode (getElementById)
import Web.HTML (window)
import Web.HTML.HTMLDocument (toNonElementParentNode)
import Web.HTML.Window (document)

main :: Effect Unit
main = do
    Console.log "Heyyyoooouuuuxxxx"
    root <- getElementById "app" <<< toNonElementParentNode =<< document =<< window
    case root of
        Nothing -> Console.error "App container could not be found"
        Just container -> do
          counter <- mkCounter
          render (counter unit) container
