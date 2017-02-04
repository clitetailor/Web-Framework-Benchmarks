{-# LANGUAGE OverloadedStrings #-}
module Main where

import           Control.Applicative
import           Snap.Core
import           Snap.Util.FileServe
import           Snap.Http.Server

main :: IO ()
main = httpServe (setPort 8000 mempty) site

site :: Snap ()
site =
    ifTop (serveFile "..\\react-app\\dist\\index.html")
    <|> serveDirectory "..\\react-app\\dist"
    <|> writeBS "Error 404: Not Found!"
