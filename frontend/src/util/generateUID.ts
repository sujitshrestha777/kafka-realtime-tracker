

export function generateRandomUid(){
    const date=Date.now()
    const randomNumber=Math.random()
    const randomSubPart=randomNumber.toString().substring(2)
    const uniqueId=`${randomSubPart}${date}`
    return uniqueId
}