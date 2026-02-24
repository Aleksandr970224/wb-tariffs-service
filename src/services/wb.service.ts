import axios from 'axios';

export async function fetchWbTariffs() {
  const token = process.env.WB_API_TOKEN;
  const url = 'https://common-api.wildberries.ru/api/v1/tariffs/box';
  const date = new Date().toISOString().split('T')[0];

  try {
    const response = await axios.get(url, {
      headers: { 'Authorization': token },
      params: { date }
    });

    const list = response.data?.data?.warehouseList || response.data?.response?.data?.warehouseList;

    if (!Array.isArray(list)) {
      return [];
    }

    const parseValue = (val: any) => {
      if (val === undefined || val === null || val === '') return 0;
      const cleaned = String(val).replace(',', '.').replace(/[^\d.-]/g, '');
      const n = parseFloat(cleaned);
      return isFinite(n) ? n : 0;
    };

    return list.map((w: any) => ({
      warehouse_id: String(w.warehouseName),
      box_id: 'box_standard',
      coefficient: parseValue(w.boxDeliveryAndStorageExpr || w.boxDeliveryCoefExpr),
      price: parseValue(w.boxDeliveryBase),
      record_date: date
    }));

  } catch (error: any) {
    console.error(error.response?.status, error.response?.data || error.message);
    return [];
  }
}
