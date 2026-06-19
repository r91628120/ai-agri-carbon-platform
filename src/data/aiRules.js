export function getSuggestion(data) {

  const result = [];

  if(data.fertilizer > 1000){

    result.push(
      "肥料使用量偏高，建議改用有機肥。"
    );

  }

  if(data.diesel > 500){

    result.push(
      "柴油使用量偏高，建議導入智慧灌溉。"
    );

  }

  if(data.electricity > 3000){

    result.push(
      "建議導入太陽能設備。"
    );

  }

  return result;
}