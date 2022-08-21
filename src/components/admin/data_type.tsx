import Client from 'src/assets/icons/Client';
import Dashboard from 'src/assets/icons/Dashboard';
import Healers from 'src/assets/icons/Healers';
import Financial from 'src/assets/icons/Financial';
import Image from 'src/components/shared/share/Image';
import EditDelete from 'src/components/shared/share/edit-delete';
import Space from 'src/components/shared/share/space';
import TickCloseAdmin from '../shared/share/tick-close-admin';

export const ColumnClient = [
    { id: 'image', label: '', Component: Image },
    { id: 'clientname', label: 'Client Name', Component: Space },
    { id: 'gender', label: 'Gender', Component: Space },
    { id: 'phonenumber', label: 'Phone Number', Component: Space },
    // { id: 'num', label: 'Num. Current Session', Component: Space },
    { id: 'options', label: '', Component: EditDelete }
];

export const ColumnFinancial = [
    { id: 'clientname', label: 'Client Name', Component: Space },
    { id: 'session', label: 'Session Name', Component: Space },
    { id: 'duration', label: 'Duration', Component: Space },
    { id: 'healername', label: 'Healer Name', Component: Space },
    { id: 'healerstatus', label: 'Healer Status', Component: Space },
    { id: 'cost', label: 'Cost', Component: Space }
];

export const ColumnHealerPending = [
    { id: 'image', label: '', Component: Image },
    { id: 'healerame', label: 'Exercises', Component: Space },
    { id: 'healertype', label: 'Service Type', Component: Space },
    { id: 'gender', label: 'Gender', Component: Space },
    { id: 'phonenumber', label: 'Phone Number', Component: Space },
    { id: 'options', label: '', Component: TickCloseAdmin }
];

export const ColumnHealerApprove = [
    { id: 'image', label: '', Component: Image },
    { id: 'healerame', label: 'Exercises', Component: Space },
    { id: 'healertype', label: 'Service Type', Component: Space },
    { id: 'gender', label: 'Gender', Component: Space },
    { id: 'phonenumber', label: 'Phone Number', Component: Space },
    { id: 'num', label: 'Num. Current Session', Component: Space },
    { id: 'options', label: '', Component: EditDelete }
];

export const tabs = [
    { label: 'Pending', id: 'pending' },
    { label: 'Aproved', id: 'approved' }
];

export const tabsParent = [
    { label: 'Dashboard', id: 'dashboard', Icon: Dashboard },
    { label: 'Healers', id: 'healers', Icon: Healers },
    { label: 'Client', id: 'client', Icon: Client },
    { label: 'Financial', id: 'financial', Icon: Financial }
];
