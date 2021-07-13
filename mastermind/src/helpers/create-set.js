export default function createSet() {
    let set = [];
    for (let n1 = 1; n1 <= 6; n1++) {
        for (let n2 = 1; n2 <= 6; n2++) {
            for (let n3 = 1; n3 <= 6; n3++) {
                for (let n4 = 1; n4 <= 6; n4++) {
                    set.push(`${n1}${n2}${n3}${n4}`);
                }
            }
        }
    }
    return set
}
