#!/bin/bash

HEADER="""/*
Copyright 2024 Google LLC

Licensed under the Apache License, Version 2.0 (the \"License\");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an \"AS IS\" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
"""

for file in "$@"; do
  if [[ -f "$file" ]]; then
    echo "Adding header to $file"
    TMP_FILE=$(mktemp)
    echo "$HEADER" > "$TMP_FILE"
    cat "$file" >> "$TMP_FILE"
    mv "$TMP_FILE" "$file"
  else
    echo "Skipping $file, not a regular file."
  fi
done