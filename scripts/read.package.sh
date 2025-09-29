#!/bin/bash

# STEP 1: Extract the scripts block (key-value pairs only)
scripts_block=$(awk '
  /"scripts"[[:space:]]*:/ { inside=1; next }
  inside {
    if ($0 ~ /}/) exit
    print $0
  }
' package.json)

# Extract scriptDescriptions block (key-value pairs only)
descriptions_block=$(awk '
  /"scriptDescriptions"[[:space:]]*:/ { inside=1; next }
  inside {
    if ($0 ~ /}/) exit
    print $0
  }
' package.json)

# STEP 2: Convert to Bash arrays: keys and values
keys=()
values=()

while IFS=: read -r line; do
  key=$(echo "$line" | sed -E 's/^[[:space:]]*"([^"]+)".*/\1/')
  val=$(echo "$line" | sed -E 's/.*:\s*"([^"]+)".*/\1/')

  keys+=("$key")
  values+=("$val")
done <<< "$scripts_block"


# Parse descriptions into associative array
declare -A descriptions

while IFS= read -r line; do
  dkey=$(echo "$line" | sed -E 's/^[[:space:]]*"([^"]+)".*/\1/')
  dval=$(echo "$line" | sed -E 's/.*:\s*"([^"]+)".*/\1/')
  descriptions["$dkey"]="$dval"
done <<< "$descriptions_block"


# STEP 3: Print the arrays
echo "Available scripts:"
for i in "${!keys[@]}"; do
    key="${keys[i]}"
    description="${descriptions[$key]}"
    printf "%2d) %-20s %s\n" $((i+1)) "${key}" "${description}"
done

echo -n "Enter the number of the script to run: "
read -r script_number

index=$((script_number-1))

if [[ "${index}" -ge 0 && "${index}" -lt "${#values[@]}" ]]; then
  echo "Running script: ${keys[$index]}"
  eval "${values[$index]}"
else
  echo "Invalid script number"
  exit 1
fi
  