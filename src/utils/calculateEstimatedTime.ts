export function calculateEstimatedTime(time: string): string {
    const statusDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const createdAtTime = new Date(time).getTime();
    const estimatedTime = new Date(createdAtTime + statusDuration);
    return estimatedTime.toLocaleString(); // Format the date as needed
}