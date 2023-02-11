export default {
  /**
   * Форматируем цены
   * @param value             - значение цены
   * @param options.delimiter - разделитель целой и дробной частей
   * @param options.currency  - добавить символ валюты
   * @param options.currencySign - указать свой символ валюты (взамен ₽)
   * @param options.integer   - извлечь только целое значение
   */
  price(value, options) {
    const fixed = Number(value).toFixed(2);
    let parts = fixed.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    if (options?.integer) {
      parts = [parts[0]];
    } else {
      parts = [parts[0], options?.delimiter || ".", parts[1]];
    }

    if (options?.currency) {
      parts.push(` ${options.currencySign || "₽"}`);
    }

    return parts.join("");
  },
};
