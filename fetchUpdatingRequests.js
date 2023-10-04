/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
const {
  env: { PORT },
  argv,
} = process;

const userId = argv[2];
const url = `http://localhost:${PORT}/balance/user/${userId}`;

const headers = {
  "Content-Type": "application/json",
};

const totalRequests = 10000;
const batchSize = 100;
let successfulResponses = 0;
let errorResponses = 0;

async function makeBatchedRequests(startIndex) {
  const requests = [];

  // Create an array of promises for the current batch
  for (let i = startIndex; i < startIndex + batchSize; i++) {
    if (i >= totalRequests) {
      break;
    }

    const requestBody = {
      amount: -2,
    };

    const requestPromise = fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          successfulResponses++;
        } else {
          errorResponses++;
        }
      })
      .catch((error) => {
        console.error(error.name);
        console.error(error.message);
        console.error(error.code);
        console.error("Fetch error:", error);
        errorResponses++;
      });

    requests.push(requestPromise);
  }

  await Promise.all(requests);
}

async function run() {
  for (let i = 0; i < totalRequests; i += batchSize) {
    await makeBatchedRequests(i);
    console.log(
      `Batch completed. Successful responses: ${successfulResponses}, Error responses: ${errorResponses}`,
    );
  }

  console.log("All requests completed.");
}

(async () => {
  await run();
})();
