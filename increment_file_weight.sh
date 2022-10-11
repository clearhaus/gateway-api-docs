#!/bin/bash

new_weight=0
echo "All files weight greater than the selected files weight will be incremented"
echo "Select file:"
select choice in $(find ./website/content -name "*.md" -type f); do
    [[ -n $choice ]] || { echo "Invalid choice. Please try again." >&2; continue; }
    selected_weight=$(cat $choice | grep "weight"| grep -o '[[:digit:]]*') 
    for f in $(find ./website/content -name "*.md" -type f); do
        current_weight=$(cat $f | grep "weight"| grep -o '[[:digit:]]*') 
        if [ "$current_weight" -gt "$selected_weight" ]; then
            ((new_weight=current_weight+5))
            sed -i "s/weight: $current_weight/weight: $new_weight/" $f
        fi
    done
    break # valid choice was made; exit prompt.
done
read -r file_name <<<"$choice"
