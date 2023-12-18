export function TutoringOffer(description, location, subject, price, timeFrom, timeUntil, weekdays) {
    this.description = description
    this.location = location
    this.subject = subject
    this.price = price
    this.timeFrom = timeFrom
    this.timeUntil = timeUntil
    this.weekdays = weekdays
}

export const WeekdayNamesMapping = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota']
