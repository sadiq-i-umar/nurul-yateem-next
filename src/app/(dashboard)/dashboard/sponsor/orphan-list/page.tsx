import OrphanSponsorshipCard from '../../../../../../components/cards/orphan-sponsorship';
import OrphanListPage from '../../../../../../components/orphan-list/page';

const cardData = [
  {
    id: 1,
    name: 'Ajanah Nazih 1',
    date: '22 Jan 2022',
    status: 'In School',
    needs: ['School', 'Health'],
    amountGotten: 'N80,000',
    amountToGo: 'N150,000',
    progress: 40,
  },
  {
    id: 2,
    name: 'Ajanah Nazih 2',
    date: '22 Feb 2022',
    status: 'In School',
    needs: ['School', 'Health'],
    amountGotten: 'N70,000',
    amountToGo: 'N130,000',
    progress: 70,
  },
  {
    id: 3,
    name: 'Ajanah Nazih 3',
    date: '22 Feb 2022',
    status: 'In School',
    needs: ['School', 'Health'],
    amountGotten: 'N70,000',
    amountToGo: 'N130,000',
    progress: 90,
  },
  {
    id: 4,
    name: 'Ajanah Nazih 4',
    date: '22 Feb 2022',
    status: 'In School',
    needs: ['School', 'Health'],
    amountGotten: 'N70,000',
    amountToGo: 'N130,000',
    progress: 15,
  },
  {
    id: 5,
    name: 'Ajanah Nazih 5',
    date: '22 Feb 2022',
    status: 'In School',
    needs: ['School', 'Health'],
    amountGotten: 'N70,000',
    amountToGo: 'N130,000',
    progress: 30,
  },
  {
    id: 6,
    name: 'Ajanah Nazih 6',
    date: '22 Feb 2022',
    status: 'In School',
    needs: ['School', 'Health'],
    amountGotten: 'N70,000',
    amountToGo: 'N130,000',
    progress: 50,
  },
];

export default function OrphanList() {
  return (
    <>
      <OrphanListPage />
      {/*<OrphanSponsorshipCard cardData={cardData} />*/}
    </>
  );
}
