#!/bin/bash

# Array of id:translation
items=(
  "artichoke:Artichaut"
  "asparagus:Asperge"
  "basil:Basilic"
  "beans:Haricots"
  "beetroot:Betterave"
  "bell_pepper:Poivron"
  "blackberry:Mûre"
  "blueberry:Myrtille"
  "broccoli:Brocoli"
  "brussels_sprout:Chou de Bruxelles"
  "cabbage:Chou"
  "cauliflower:Chou-fleur"
  "celery:Céleri"
  "chives:Ciboulette"
  "cilantro:Coriandre"
  "corn:Maïs"
  "cucumber:Concombre"
  "dill:Aneth"
  "eggplant:Aubergine"
  "fennel:Fenouil"
  "garlic:Ail"
  "hot_pepper:Piment"
  "kale:Chou frisé"
  "kohlrabi:Chou-rave"
  "leek:Poireau"
  "lettuce:Laitue"
  "melon:Melon"
  "mint:Menthe"
  "okra:Gombo"
  "onion:Oignon"
  "oregano:Origan"
  "parsley:Persil"
  "parsnip:Panais"
  "peas:Petits pois"
  "potato:Pomme de terre"
  "pumpkin:Citrouille"
  "radish:Radis"
  "raspberry:Framboise"
  "rosemary:Romarin"
  "rutabaga:Rutabaga"
  "sage:Sauge"
  "spinach:Épinards"
  "strawberry:Fraise"
  "sweet_potato:Patate douce"
  "thyme:Thym"
  "tomato:Tomate"
  "turnip:Navet"
  "watermelon:Pastèque"
  "zucchini:Courgette"
)

for item in "${items[@]}"; do
  id="${item%%:*}"
  trans="${item#*:}"
  file="data/produce/$id.md"
  
  if [ -f "$file" ]; then
    # Check if name_fr already exists
    if grep -q "name_fr:" "$file"; then
      echo "Skipping $id: already has name_fr"
    else
      # Insert name_fr after name: [Something]
      sed -i '' "/name: /a\\
name_fr: $trans" "$file"
      echo "Updated $id with $trans"
    fi
  else
    echo "Warning: $file not found"
  fi
done
