import React from 'react';
import { Button, Tag } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStores } from '../stores';

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
            onChange={(checked) => filterStore.toggleDealer(dealerId)}
          >
            {dealerId}
          </CheckableTag>
        ))}
      </div>
      <Button onClick={() => filterStore.cyclePriceSort()}>
        Sort by price ({filterStore.priceSort})
      </Button>
    </div>
  );
};

export default observer(Filters);
