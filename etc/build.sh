#!/usr/bin/env bash

latex testPrintf.tex
latex testPrintf.tex
latex testPrintf.tex
latex testPrintf.tex
dvips -o testPrintf.ps testPrintf.dvi
ps2pdf testPrintf.ps testPrintf.pdf
