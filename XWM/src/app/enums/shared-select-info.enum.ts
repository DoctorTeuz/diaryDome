export const SHOW_TYPES = [
    'House Show', 'Live Event', 'PPV', 'Television'
];

export const SHOW_TYPES_SELECT = [
    {
        label: 'House Show',
        value: 'House Show',
    },
    {
        label: 'Live Event',
        value: 'Live Event',
    },
    {
        label: 'PPV',
        value: 'PPV',
    },
    {
        label: 'Television',
        value: 'Television',
    }
]

export const WEEK_DAYS = [
    {
        label: 'Lunedì',
        value: 'Lunedi',
    },
    {
        label: 'Martedì',
        value: 'Martedi',
    },
    {
        label: 'Mercoledì',
        value: 'Mercoledi',
    },
    {
        label: 'Giovedì',
        value: 'Giovedi',
    },
    {
        label: 'Venerdì',
        value: 'Venerdi',
    },
    {
        label: 'Sabato',
        value: 'Sabato',
    },
    {
        label: 'Domenica',
        value: 'Domenica',
    }
];

export const CONTEXT_TYPE = [
    {
        value: 1,
        label: "Stile 1",
        description: 'Lo show avrà una larghezza massima di 700px e sarà centrato rispetto allo schermo. Il testo sarà allineato a sinistra.'
    },
    {
        value: 2,
        label: "Stile 2",
        description: 'Lo show avrà una larghezza massima di 700px e sarà centrato rispetto allo schermo. Il testo sarà centrato.'
    },
    {
        value: 3,
        label: "Stile 3",
        description: 'Lo show avrà una larghezza massima di sulla base della dimensione dello spazio concesso dal forum e sarà centrato rispetto allo schermo. Il testo sarà allineato a sinistra.'
    },
    {
        value: 4,
        label: "Stile 4",
        description: 'Lo show avrà una larghezza massima di sulla base della dimensione dello spazio concesso dal forum e sarà centrato rispetto allo schermo. Il testo sarà centrato.'
    }
];

export const ANGLE_TYPE = [
    {
        value: 1,
        label: "Stile 1",
        description: 'Il segmento avrà un bordo superiore che permette di dividerlo dal resto dello show. Il contenuto è giustificato (allineato a sinistra e a destra). In alto a sinistra è presente una tag per indicare il titolo del segmento o la zona dove viene svolto.'
    },
    {
        value: 2,
        label: "Stile 2",
        description: 'Il segmento avrà un bordo superiore che permette di dividerlo dal resto dello show. Il contenuto è centrato. In alto a sinistra è presente una tag per indicare il titolo del segmento o la zona dove viene svolto.'
    },
    {
        value: 3,
        label: "Stile 3",
        description: 'Il segmento è contornato da un bordo colorato e stondato. Il contenuto è centrato. In alto a sinistra è presente una tag per indicare il titolo del segmento o la zona dove viene svolto.'
    },
    {
        value: 4,
        label: "Stile 4",
        description: 'Il segmento è contornato da un bordo colorato e stondato. Il contenuto è giustificato (allineato a sinistra e a destra). In alto a sinistra è presente una tag per indicare il titolo del segmento o la zona dove viene svolto.'
    },
    {
        value: 5,
        label: "Stile 4",
        description: 'Il segmento è contornato da un bordo colorato e stondato. Il contenuto è centrato. In alto a sinistra è presente una tag per indicare il titolo del segmento o la zona dove viene svolto.'
    },
    {
        value: 6,
        label: "Stile 6",
        description: 'Il segmento è contornato da un bordo colorato e stondato. Il contenuto è giustificato (allineato a sinistra e a destra). In alto a sinistra è presente una tag per indicare il titolo del segmento o la zona dove viene svolto.'
    },
    {
        value: 7,
        label: "Stile 7",
        description: 'Il segmento non ha particolari grafiche e segue la formattazione scelta per lo show nella prima voce.'
    }
];

export const MATCH_TYPE = [
    {
        value: 1,
        label: "Stile 1",
        description: 'Il match non ha bordature, ma solo uno sfondo leggermente più chiaro per creare un contrasto con il resto dello show. Sono presenti le immagini dei lottatori e, in caso di match titolato è presente anche quella della cintura.' + 
                    'In alto a sinistra sono posti i dati del match, mentre in basso a destra il vincitore della sfida. Il comportamento è dinamico sulla base di campione/non campione e se il titolo è cambiato.'
    },
    {
        value: 2,
        label: "Stile 2",
        description: 'Il match non ha bordature ne colori di background. Sono presenti le immagini dei lottatori e, in caso di match titolato è presente anche quella della cintura.' + 
                    'In alto a sinistra sono posti i dati del match, mentre in basso a destra il vincitore della sfida. Il comportamento è dinamico sulla base di campione/non campione e se il titolo è cambiato.'
    },
    {
        value: 3,
        label: "Stile 3",
        description: 'Il match non ha bordature, ma solo uno sfondo leggermente più chiaro per creare un contrasto con il resto dello show. Non sono presenti le immagini dei lottatori ne, in caso di match titolato è presente anche quella della cintura.' + 
                    'In alto a sinistra sono posti i dati del match, mentre in basso a destra il vincitore della sfida. Il comportamento è dinamico sulla base di campione/non campione e se il titolo è cambiato.'
    },
    {
        value: 4,
        label: "Stile 4",
        description: 'Il match non ha bordature ne colori di background. Non sono presenti le immagini dei lottatori ne, in caso di match titolato è presente anche quella della cintura.' + 
                    'In alto a sinistra sono posti i dati del match, mentre in basso a destra il vincitore della sfida. Il comportamento è dinamico sulla base di campione/non campione e se il titolo è cambiato.'
    },
    {
        value: 5,
        label: "Stile 5",
        description: 'Il match ha un bordo e solo uno sfondo leggermente più chiaro per creare un contrasto con il resto dello show. Sono presenti le immagini dei lottatori e, in caso di match titolato è presente anche quella della cintura.' + 
                    'In alto a sinistra sono posti i dati del match, mentre in basso a destra il vincitore della sfida. Il comportamento è dinamico sulla base di campione/non campione e se il titolo è cambiato.'
    },
    {
        value: 6,
        label: "Stile 6",
        description: 'Il match ha un bordo ma nessun colore di background. Sono presenti le immagini dei lottatori e, in caso di match titolato è presente anche quella della cintura.' + 
                    'In alto a sinistra sono posti i dati del match, mentre in basso a destra il vincitore della sfida. Il comportamento è dinamico sulla base di campione/non campione e se il titolo è cambiato.'
    },
    {
        value: 7,
        label: "Stile 7",
        description: 'Il match ha un bordo e solo uno sfondo leggermente più chiaro per creare un contrasto con il resto dello show. Non sono presenti le immagini dei lottatori ne, in caso di match titolato è presente anche quella della cintura.' + 
                    'In alto a sinistra sono posti i dati del match, mentre in basso a destra il vincitore della sfida. Il comportamento è dinamico sulla base di campione/non campione e se il titolo è cambiato.'
    },
    {
        value: 8,
        label: "Stile 8",
        description: 'Il match ha un bordo ma nessun colore di background. Non sono presenti le immagini dei lottatori ne, in caso di match titolato è presente anche quella della cintura.' + 
                    'In alto a sinistra sono posti i dati del match, mentre in basso a destra il vincitore della sfida. Il comportamento è dinamico sulla base di campione/non campione e se il titolo è cambiato.'
    },
    {
        value: 9,
        label: "Stile 9",
        description: 'Il match ha un bordo e solo uno sfondo leggermente più chiaro per creare un contrasto con il resto dello show. Sono presenti le immagini dei lottatori e, in caso di match titolato è presente anche quella della cintura.' + 
                    'In alto a sinistra sono posti i dati del match, mentre in basso a destra il vincitore della sfida. Il comportamento è dinamico sulla base di campione/non campione e se il titolo è cambiato.' + 
                    'Il titolo e i lottatori sono racchiusi in una seconda cornice per evidenziarli maggiormente.'
    },
    {
        value: 10,
        label: "Stile 10",
        description: 'Il match ha un bordo ma nessun colore di background. Sono presenti le immagini dei lottatori e, in caso di match titolato è presente anche quella della cintura.' + 
                    'In alto a sinistra sono posti i dati del match, mentre in basso a destra il vincitore della sfida. Il comportamento è dinamico sulla base di campione/non campione e se il titolo è cambiato.' + 
                    'Il titolo e i lottatori sono racchiusi in una seconda cornice per evidenziarli maggiormente.'
    },
    {
        value: 11,
        label: "Stile 11",
        description: 'Il match non ha bordature, ma solo uno sfondo leggermente più chiaro per creare un contrasto con il resto dello show. Sono presenti le immagini dei lottatori e, in caso di match titolato è presente anche quella della cintura.' + 
                    'In alto a sinistra sono posti i dati del match, mentre in basso a destra il vincitore della sfida. Il comportamento è dinamico sulla base di campione/non campione e se il titolo è cambiato.' + 
                    'Il titolo e i lottatori sono racchiusi in una seconda cornice per evidenziarli maggiormente.'
    },
    {
        value: 12,
        label: "Stile 12",
        description: 'Il match non ha bordature ne colori di background. Sono presenti le immagini dei lottatori e, in caso di match titolato è presente anche quella della cintura.' + 
                    'In alto a sinistra sono posti i dati del match, mentre in basso a destra il vincitore della sfida. Il comportamento è dinamico sulla base di campione/non campione e se il titolo è cambiato.' + 
                    'Il titolo e i lottatori sono racchiusi in una cornice per evidenziarli maggiormente.'
    },
    {
        value: 13,
        label: "Stile 13",
        description: ''
    },
    {
        value: 14,
        label: "Stile 14",
        description: ''
    },
    {
        value: 15,
        label: "Stile 15",
        description: ''
    }
];