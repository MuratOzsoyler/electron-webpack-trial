module Counter where

import Prelude

import Effect.Timer (clearInterval, setInterval)
import React.Basic.DOM (text)
import React.Basic.DOM as R
import React.Basic.Hooks (Component, component, useEffectOnce, useState, (/\))
import React.Basic.Hooks as React


mkCounter :: Component Unit
mkCounter = component "App" \_ -> React.do
    count /\ setCount <- useState 0

    useEffectOnce do
        timer <- setInterval 1000 $ setCount (_ + 1)
        pure $ clearInterval timer

    pure $ R.div_
        [ R.h3_ [text "Counter"]
        , R.h1_ [text $ show count]
        ]