import { error5xx } from "config";
import type { BookingFormPropsT } from "typings/mixTypes";
import createHtmlInputDateTimeValue from "utils/createHtmlInputDateTimeValue";

export default function BookingForm({
  handleSubmit,
  loading,
  error,
  callOn,
  message,
  recipientLine,
}: BookingFormPropsT) {
  // callOn fix: if value is undefined before mount pass 0
  const callOnDateTime = createHtmlInputDateTimeValue(+callOn! || 0);
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-7">
        <input
          name="recipientLine"
          placeholder="Recipient line eg 080XX"
          type="tel"
          defaultValue={recipientLine}
          required
          className="input input-sm input-bordered w-full max-w-xs mt-5"
        />
        <textarea
          rows={4}
          name="message"
          placeholder="Message"
          defaultValue={message}
          required
          className="textarea textarea-bordered w-full max-w-xs"
        />
        <div>
          <label>
            Date and Time
            <div>
              <input
                name="callOn"
                type="datetime-local"
                defaultValue={callOnDateTime}
                required
                className="input input-sm input-bordered w-full max-w-xs"
              />
            </div>
          </label>
        </div>
        <div>
          <button disabled={loading} className="btn btn-sm btn-secondary">
            {loading ? <i>wait...</i> : "Submit"}
          </button>
        </div>
        <br />
        <i>{error && error5xx}</i>
      </form>
    </div>
  );
}
