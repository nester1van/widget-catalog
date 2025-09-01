import React from "react";
import { Button, Tag } from "antd";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/StoreProvider";

const { CheckableTag } = Tag;

const Filters: React.FC = () => {
  const { dealersStore, filterStore } = useStores();

  return (
    <div className="widget-catalog__filters">
      <div>
        {dealersStore.dealers.map((dealerId) => (
          <CheckableTag
            key={dealerId}
            checked={filterStore.selectedDealers.includes(dealerId)}
            onChange={() => filterStore.toggleDealer(dealerId)}
          >
            {dealerId}
          </CheckableTag>
        ))}
      </div>
      <Button onClick={() => filterStore.cyclePriceSort()}>
        Сортировать по цене ({filterStore.priceSort})
      </Button>
    </div>
  );
};

export default observer(Filters);
