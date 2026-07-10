// import { getPendingTriage, markAsSynced } from "../repository/TriageRepository";
// import { postTriageRecord } from "./mockupapi";


// export async function syncPendingRecords() {

//     const pendingRecords = await getPendingTriage();

//     for (const record of pendingRecords) {

//         try {

//             await postTriageRecord(record);

//             await markAsSynced(record.id);

//             console.log(
//                 `Synced ${record.id}`
//             );

//         } catch(error) {

//             console.log(
//                 `Failed syncing ${record.id}`
//             );

//         }

//     }
// }



import { getPendingTriage, markAsSynced } from "../repository/TriageRepository";
import { postTriageRecord } from "./mockupapi";

// to prevent multiple syncs running at the same time
let isSyncing = false;


export async function syncPendingRecords() {

    if (isSyncing) {
        console.log("Sync already running");
        return;
    }


    isSyncing = true;


    try {

        const pendingRecords = await getPendingTriage();


        console.log(
            `Found ${pendingRecords.length} pending records`
        );


        for (const record of pendingRecords) {

            try {

                await postTriageRecord(record);

                await markAsSynced(record.id);


                console.log(
                    `Synced ${record.id}`
                );


            } catch(error) {

                console.log(
                    `Failed syncing ${record.id}`
                );

            }

        }


    } finally {

        isSyncing = false;

    }

}