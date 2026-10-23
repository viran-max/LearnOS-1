export default class journeyModel{
    journeyTitle=""
    hookLine=""
    journeyDescription=""
    coverImage=""
    status="Draft"
    submittedBy="admin" // admin or the submitting user id

    submittedByName="Admin" // display the name of whoever submitted
    approvalStatus="approved" // admin journey auto approaved , user pending by default
    createdAt=Date.now()
    updatedAt=Date.now()
}