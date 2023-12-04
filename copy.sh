#!/bin/bash

rsync -r ../tachyons/css/* "$CATO/console-frontend/public/assets/css"
rsync -r ../tachyons/css/* "$CATO/website/cato.digital/assets/css"
