import React from "react";
import { Button, Tag } from "antd";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/StoreProvider";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { SortMode } from "@/types";

const { CheckableTag } = Tag;

const getSortIcon = (sortMode: SortMode) => {
  switch (sortMode) {
    case "asc":
      return <CaretUpOutlined />;
    case "desc":
      return <CaretDownOutlined />;
    default:
      return <SwapOutlined />;
  }
};

const Filters: React.FC = () => {
  const { dealersStore, filterStore } = useStores();

  return (
    <div className="widget-catalog__filters">
      <div>
        {dealersStore.initialDealers.map((dealerId) => (
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
        Сортировать по цене {getSortIcon(filterStore.priceSort)}
      </Button>
    </div>
  );
};

export default observer(Filters);
