export const MAX_PARALLEL = navigator.hardwareConcurrency
    ? Math.min(
        Math.max(2, Math.floor(navigator.hardwareConcurrency / 2)),
        8
    )
    : 3;

export const processInParallel = async (items, processor, maxParallel = 3) => {
    const results = new Array(items.length);
    let currentIndex = 0;

    async function worker() {
        while (true) {
            const index = currentIndex++;
            if (index >= items.length) break;

            try {
                results[index] = await processor(items[index], index);
            } catch (error) {
                results[index] = { error };
            }
        }
    }

    const workers = Array.from({ length: Math.min(maxParallel, items.length) }, worker);
    await Promise.all(workers);

    return results;
};