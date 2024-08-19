export class CreatePipeBodyBase {
    total_length: number
    constructor(builder: { total_length: number }) {
        this.total_length = builder.total_length
    }
}
