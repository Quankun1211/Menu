import { useEffect, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import CheckoutScreen from '@/modules/checkout/screens/CheckOutScreen';
import { useCheckoutStore } from '@/store/useCheckoutStore';

type CheckoutSource = 'cart' | 'buy_now' | 'menu' | 'recipe';

export default function CheckOutTabs() {
  const { source, items } = useLocalSearchParams<{
    source: CheckoutSource;
    items: string;
  }>();
  const draftSource = useCheckoutStore((state) => state.source);
  const draftItems = useCheckoutStore((state) => state.items);
  const setCheckoutDraft = useCheckoutStore((state) => state.setCheckoutDraft);

  const routeItems = useMemo(() => {
    if (!items) return [];
    try {
      const parsed = JSON.parse(items);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [items]);

  useEffect(() => {
    if (routeItems.length > 0) {
      setCheckoutDraft(source || 'cart', routeItems);
    }
  }, [routeItems, setCheckoutDraft, source]);

  return (
    <CheckoutScreen
      source={routeItems.length > 0 ? (source || 'cart') : draftSource}
      items={routeItems.length > 0 ? routeItems : draftItems}
    />
  );
}
